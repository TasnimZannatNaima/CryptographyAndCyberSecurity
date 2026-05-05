"""
EUCLIDEAN ALGORITHM
Finds the Greatest Common Divisor (GCD) of two numbers
"""

def euclidean_algorithm(a, b):
    """
    Iterative version of Euclidean algorithm to find GCD
    
    Parameters:
    a, b: integers
    
    Returns:
    GCD of a and b
    """
    a, b = abs(a), abs(b)  # Handle negative numbers
    
    while b != 0:
        a, b = b, a % b
    return a

def euclidean_algorithm_recursive(a, b):
    """
    Recursive version of Euclidean algorithm to find GCD
    
    Parameters:
    a, b: integers
    
    Returns:
    GCD of a and b
    """
    a, b = abs(a), abs(b)  # Handle negative numbers
    
    if b == 0:
        return a
    return euclidean_algorithm_recursive(b, a % b)

def euclidean_algorithm_with_steps(a, b):
    """
    Euclidean algorithm that shows each step of calculation
    
    Parameters:
    a, b: integers
    
    Returns:
    GCD of a and b
    """
    original_a, original_b = a, b
    a, b = abs(a), abs(b)
    
    print(f"\n{'='*50}")
    print(f"Finding GCD of {original_a} and {original_b}")
    print(f"{'='*50}")
    
    step = 1
    while b != 0:
        quotient = a // b
        remainder = a % b
        print(f"Step {step}: {a} = {quotient} × {b} + {remainder}")
        a, b = b, remainder
        step += 1
    
    print(f"\n✓ GCD({original_a}, {original_b}) = {a}")
    print(f"{'='*50}\n")
    return a

def main():
    """Interactive demonstration of Euclidean algorithm"""
    print("\n" + "="*50)
    print("   EUCLIDEAN ALGORITHM - GCD CALCULATOR")
    print("="*50)
    
    while True:
        print("\nOptions:")
        print("1. Calculate GCD (iterative)")
        print("2. Calculate GCD (recursive)")
        print("3. Calculate GCD with step-by-step display")
        print("4. Exit")
        
        choice = input("\nEnter your choice (1-4): ").strip()
        
        if choice == '4':
            print("\nThank you for using the GCD Calculator!")
            break
        
        if choice not in ['1', '2', '3']:
            print("Invalid choice! Please try again.")
            continue
        
        try:
            num1 = int(input("Enter first number: "))
            num2 = int(input("Enter second number: "))
            
            if choice == '1':
                result = euclidean_algorithm(num1, num2)
                print(f"\n✓ GCD({num1}, {num2}) = {result}")
            
            elif choice == '2':
                result = euclidean_algorithm_recursive(num1, num2)
                print(f"\n✓ GCD({num1}, {num2}) = {result}")
            
            elif choice == '3':
                result = euclidean_algorithm_with_steps(num1, num2)
        
        except ValueError:
            print("❌ Error: Please enter valid integers!")
        except Exception as e:
            print(f"❌ Error: {e}")

if __name__ == "__main__":
    main()