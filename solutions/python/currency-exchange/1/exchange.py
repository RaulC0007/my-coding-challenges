def exchange_money(budget, exchange_rate):
    """
    Estimate the value of exchanged currency.
    
    Args:
        budget (float): Amount of domestic currency to exchange
        exchange_rate (float): Exchange rate (domestic per foreign unit)
    
    Returns:
        float: Amount of foreign currency received
    """
    return budget / exchange_rate


def get_change(budget, exchanging_value):
    """
    Calculate remaining money after exchange.
    
    Args:
        budget (float): Total available money
        exchanging_value (float): Amount being exchanged
    
    Returns:
        float: Money left after exchange
    """
    return budget - exchanging_value


def get_value_of_bills(denomination, number_of_bills):
    """
    Calculate total value of bills received.
    
    Args:
        denomination (int): Value of each bill
        number_of_bills (int): Number of bills received
    
    Returns:
        int: Total value of bills
    """
    return denomination * number_of_bills


def get_number_of_bills(amount, denomination):
    """
    Calculate how many whole bills fit in an amount.
    
    Args:
        amount (float): Total amount of money
        denomination (int): Value of each bill
    
    Returns:
        int: Number of whole bills
    """
    return int(amount // denomination)


def get_leftover_of_bills(amount, denomination):
    """
    Calculate leftover money that can't be exchanged.
    
    Args:
        amount (float): Total amount of money
        denomination (int): Value of each bill
    
    Returns:
        float: Leftover amount
    """
    return amount % denomination


def exchangeable_value(budget, exchange_rate, spread, denomination):
    """
    Calculate maximum foreign currency value after exchange with fees.
    
    Args:
        budget (float): Domestic currency amount
        exchange_rate (float): Base exchange rate
        spread (int): Exchange fee percentage
        denomination (int): Bill denomination
    
    Returns:
        int: Maximum value in foreign currency bills
    """
    # Calculate actual exchange rate with spread
    actual_rate = exchange_rate * (1 + spread / 100)
    
    # Calculate total foreign currency
    foreign_amount = budget / actual_rate
    
    # Calculate number of whole bills
    num_bills = foreign_amount // denomination
    
    # Return total value of bills
    return int(num_bills * denomination)


    # Test cases
print(exchange_money(127.5, 1.2))          # Output: 106.25
print(get_change(127.5, 120))              # Output: 7.5
print(get_value_of_bills(5, 128))          # Output: 640
print(get_number_of_bills(127.5, 5))       # Output: 25
print(get_leftover_of_bills(127.5, 20))    # Output: 7.5
print(exchangeable_value(127.25, 1.20, 10, 20))  # Output: 80
print(exchangeable_value(127.25, 1.20, 10, 5))   # Output: 95