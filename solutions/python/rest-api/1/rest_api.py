import json

class RestAPI:
    def __init__(self, database=None):
        self.users = {}
        if database and "users" in database:
            for user in database["users"]:
                name = user["name"]
                self.users[name] = {"owes": user["owes"].copy(), "owed_by": user["owed_by"].copy()}

    def get(self, url, payload=None):
        if payload:
            payload = json.loads(payload)
        if url == "/users":
            users_data = self.users
            if payload and "users" in payload:
                requested_users = payload["users"]
                users_data = {name: self.users[name] for name in requested_users if name in self.users}
            
            result = {"users": []}
            for name in sorted(users_data):
                user = users_data[name]
                owes_total = sum(user.get("owes", {}).values())
                owed_by_total = sum(user.get("owed_by", {}).values())
                balance = owed_by_total - owes_total
                user_data = {
                    "name": name,
                    "owes": user.get("owes", {}),
                    "owed_by": user.get("owed_by", {}),
                    "balance": balance
                }
                result["users"].append(user_data)
            return json.dumps(result)
        return json.dumps({"error": "Invalid URL"})

    def post(self, url, payload=None):
        if payload:
            payload = json.loads(payload)
        if url == "/add" and payload and "user" in payload:
            new_user = payload["user"]
            if new_user not in self.users:
                self.users[new_user] = {"owes": {}, "owed_by": {}}
                owes_total = sum(self.users[new_user].get("owes", {}).values())
                owed_by_total = sum(self.users[new_user].get("owed_by", {}).values())
                balance = owed_by_total - owes_total
                user_data = {
                    "name": new_user,
                    "owes": self.users[new_user]["owes"],
                    "owed_by": self.users[new_user]["owed_by"],
                    "balance": balance
                }
                return json.dumps(user_data)
            return json.dumps({"error": "User already exists"})

        elif url == "/iou" and payload and all(key in payload for key in ["lender", "borrower", "amount"]):
            lender = payload["lender"]
            borrower = payload["borrower"]
            amount = payload["amount"]

            if lender == borrower:
                return json.dumps({"error": "Lender and borrower cannot be the same"})

            if lender not in self.users:
                self.users[lender] = {"owes": {}, "owed_by": {}}
            if borrower not in self.users:
                self.users[borrower] = {"owes": {}, "owed_by": {}}

            # Calculate net
            existing_borrower_owes_lender = self.users[borrower]["owes"].get(lender, 0.0)
            existing_lender_owes_borrower = self.users[lender]["owes"].get(borrower, 0.0)
            net_existing = existing_borrower_owes_lender - existing_lender_owes_borrower
            new_net = net_existing + amount

            # Remove existing entries
            self.users[borrower]["owes"].pop(lender, None)
            self.users[lender]["owed_by"].pop(borrower, None)
            self.users[lender]["owes"].pop(borrower, None)
            self.users[borrower]["owed_by"].pop(lender, None)

            if new_net > 0:
                self.users[borrower]["owes"][lender] = new_net
                self.users[lender]["owed_by"][borrower] = new_net
            elif new_net < 0:
                self.users[lender]["owes"][borrower] = -new_net
                self.users[borrower]["owed_by"][lender] = -new_net
            # else: 0, do nothing

            result = {"users": []}
            for name in sorted([lender, borrower]):
                user = self.users[name]
                owes_total = sum(user.get("owes", {}).values())
                owed_by_total = sum(user.get("owed_by", {}).values())
                balance = owed_by_total - owes_total
                user_data = {
                    "name": name,
                    "owes": user["owes"],
                    "owed_by": user["owed_by"],
                    "balance": balance
                }
                result["users"].append(user_data)
            return json.dumps(result)
        return json.dumps({"error": "Invalid payload or URL"})