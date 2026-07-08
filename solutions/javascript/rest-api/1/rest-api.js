export class RestAPI {
  constructor(db = { users: [] }) {
    // Deep clone the database to avoid mutating the original reference
    this.db = JSON.parse(JSON.stringify(db));
  }

  get(url) {
    if (url === '/users') {
      return { 
        users: this.db.users.sort((a, b) => a.name.localeCompare(b.name)) 
      };
    }

    if (url.startsWith('/users?users=')) {
      // Extract the comma-separated names from the query string
      const query = url.split('=')[1];
      const names = query.split(',');
      
      const filteredUsers = this.db.users
        .filter(u => names.includes(u.name))
        .sort((a, b) => a.name.localeCompare(b.name));
        
      return { users: filteredUsers };
    }

    throw new Error('Endpoint not found');
  }

  post(url, payload) {
    if (url === '/add') {
      const newUser = {
        name: payload.user,
        owes: {},
        owed_by: {},
        balance: 0.0
      };
      
      this.db.users.push(newUser);
      return newUser;
    }

    if (url === '/iou') {
      const { lender, borrower, amount } = payload;
      
      const lenderObj = this.db.users.find(u => u.name === lender);
      const borrowerObj = this.db.users.find(u => u.name === borrower);

      // 1. Calculate the net balance between these two specific users
      const currentOwedByBorrower = lenderObj.owed_by[borrower] || 0;
      const currentOwesBorrower = lenderObj.owes[borrower] || 0;
      const net = currentOwedByBorrower - currentOwesBorrower + amount;

      // 2. Update Lender's records based on the new net
      if (net > 0) {
        lenderObj.owed_by[borrower] = net;
        delete lenderObj.owes[borrower];
      } else if (net < 0) {
        lenderObj.owes[borrower] = -net;
        delete lenderObj.owed_by[borrower];
      } else {
        delete lenderObj.owed_by[borrower];
        delete lenderObj.owes[borrower];
      }

      // 3. Update Borrower's records (the mathematical inverse of the lender)
      const borrowerNet = -net;
      if (borrowerNet > 0) {
        borrowerObj.owed_by[lender] = borrowerNet;
        delete borrowerObj.owes[lender];
      } else if (borrowerNet < 0) {
        borrowerObj.owes[lender] = -borrowerNet;
        delete borrowerObj.owed_by[lender];
      } else {
        delete borrowerObj.owed_by[lender];
        delete borrowerObj.owes[lender];
      }

      // 4. Helper function to recalculate a user's total balance
      const updateBalance = (user) => {
        const totalOwedBy = Object.values(user.owed_by).reduce((acc, val) => acc + val, 0);
        const totalOwes = Object.values(user.owes).reduce((acc, val) => acc + val, 0);
        user.balance = totalOwedBy - totalOwes;
      };

      updateBalance(lenderObj);
      updateBalance(borrowerObj);

      // Return both updated users, sorted alphabetically by name
      return {
        users: [lenderObj, borrowerObj].sort((a, b) => a.name.localeCompare(b.name))
      };
    }

    throw new Error('Endpoint not found');
  }
}
