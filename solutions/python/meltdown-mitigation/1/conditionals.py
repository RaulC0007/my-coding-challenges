def is_criticality_balanced(temperature, neutrons_emitted):
    """
    Determine if the reactor is in a criticality balanced state.
    
    Args:
        temperature (int or float): Temperature in kelvin
        neutrons_emitted (int or float): Neutrons emitted per second
    
    Returns:
        bool: True if conditions are met, False otherwise
    """
    return (temperature < 800 and 
            neutrons_emitted > 500 and 
            temperature * neutrons_emitted < 500000)


def reactor_efficiency(voltage, current, theoretical_max_power):
    """
    Determine the efficiency band of the reactor.
    
    Args:
        voltage (int or float): Voltage output
        current (int or float): Current output
        theoretical_max_power (int or float): Maximum possible power
    
    Returns:
        str: Efficiency band ('green', 'orange', 'red', or 'black')
    """
    generated_power = voltage * current
    efficiency = (generated_power / theoretical_max_power) * 100
    
    if efficiency >= 80:
        return 'green'
    elif efficiency >= 60:
        return 'orange'
    elif efficiency >= 30:
        return 'red'
    else:
        return 'black'


def fail_safe(temperature, neutrons_produced_per_second, threshold):
    """
    Determine the reactor's status and return appropriate action code.
    
    Args:
        temperature (int or float): Temperature in kelvin
        neutrons_produced_per_second (int or float): Neutrons per second
        threshold (int or float): Criticality threshold
    
    Returns:
        str: Status code ('LOW', 'NORMAL', or 'DANGER')
    """
    product = temperature * neutrons_produced_per_second
    lower_bound = 0.9 * threshold
    upper_bound = 1.1 * threshold
    
    if product < lower_bound:
        return 'LOW'
    elif product <= upper_bound:
        return 'NORMAL'
    else:
        return 'DANGER'

print(is_criticality_balanced(750, 600))  # True
print(is_criticality_balanced(800, 500))  # False (temp not < 800)
print(is_criticality_balanced(700, 800))  # False (product 560000 > 500000)

print(reactor_efficiency(200, 50, 15000))  # 'orange' (10000/15000 = 66.6%)
print(reactor_efficiency(300, 40, 10000))  # 'green' (12000/10000 = 120%)
print(reactor_efficiency(150, 40, 20000))  # 'black' (6000/20000 = 30%)

print(fail_safe(temperature=1000, neutrons_produced_per_second=30, threshold=5000))  # 'DANGER' (30000)
print(fail_safe(temperature=100, neutrons_produced_per_second=45, threshold=5000))  # 'LOW' (4500)
print(fail_safe(temperature=800, neutrons_produced_per_second=6, threshold=5000))  # 'NORMAL' (4800)