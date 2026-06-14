"""
EXTENDED EUCLIDEAN ALGORITHM
Finds GCD and coefficients x, y such that: a*x + b*y = gcd(a, b)
"""

def extended_euclidean_algorithm(a, b):
    """
    Extended Euclidean Algorithm (recursive)
    
    Parameters:
    a, b: integers
    
    Returns:
    tuple: (gcd, x, y) where a*x + b*y = gcd(a, b)
    """
    if b == 0:
        return abs(a), 1 if a > 0 else -1, 0
    
    gcd, x1, y1 = extended_euclidean_algorithm(b, a % b)
    x = y1
    y = x1 - (a // b) * y1
    
    return gcd, x, y

def extended_euclidean_algorithm_iterative(a, b):
    """
    Extended Euclidean Algorithm (iterative)
    
    Parameters:
    a, b: integers
    
    Returns:
    tuple: (gcd, x, y) where a*x + b*y = gcd(a, b)
    """
    original_a, original_b = a, b
    a, b = abs(a), abs(b)
    sign_a = 1 if original_a >= 0 else -1
    sign_b = 1 if original_b >= 0 else -1
    
    # Initialize coefficients
    x0, x1 = 1, 0
    y0, y1 = 0, 1
    
    while b != 0:
        quotient = a // b
        a, b = b, a % b
        x0, x1 = x1, x0 - quotient * x1
        y0, y1 = y1, y0 - quotient * y1
    
    # Adjust signs
    x = x0 * sign_a
    y = y0 * sign_b
    
    return a, x, y

def extended_euclidean_with_steps(a, b):
    """
    Extended Euclidean Algorithm with step-by-step display
    
    Parameters:
    a, b: integers
    
    Returns:
    tuple: (gcd, x, y) where a*x + b*y = gcd(a, b)
    """
    original_a, original_b = a, b
    
    print(f"\n{'='*60}")
    print(f"EXTENDED EUCLIDEAN ALGORITHM")
    print(f"Finding integers x and y such that:")
    print(f"{original_a}·x + {original_b}·y = gcd({original_a}, {original_b})")
    print(f"{'='*60}")
    
    # Store original signs
    sign_a = 1 if a >= 0 else -1
    sign_b = 1 if b >= 0 else -1
    a, b = abs(a), abs(b)
    
    # Initialize coefficients
    x0, x1 = 1, 0
    y0, y1 = 0, 1
    
    print(f"\nInitial: a = {a}, b = {b}")
    print(f"x0 = {x0}, x1 = {x1}")
    print(f"y0 = {y0}, y1 = {y1}")
    print(f"{'-'*60}")
    
    step = 1
    while b != 0:
        quotient = a // b
        remainder = a % b
        
        print(f"\nStep {step}:")
        print(f"  {a} = {quotient} × {b} + {remainder}")
        
        # Update values
        a, b = b, remainder
        x0, x1 = x1, x0 - quotient * x1
        y0, y1 = y1, y0 - quotient * y1
        
        print(f"  New a = {a}, new b = {b}")
        print(f"  x0 = {x0}, x1 = {x1}")
        print(f"  y0 = {y0}, y1 = {y1}")
        
        step += 1
    
    # Adjust signs for final coefficients
    x = x0 * sign_a
    y = y0 * sign_b
    
    print(f"\n{'='*60}")
    print(f"RESULT:")
    print(f"  GCD({original_a}, {original_b}) = {a}")
    print(f"  x = {x}, y = {y}")
    print(f"  Verification: {original_a}·{x} + {original_b}·{y} = {original_a*x + original_b*y}")
    print(f"{'='*60}\n")
    
    return a, x, y

def solve_linear_diophantine(a, b, c):
    """
    Solves linear Diophantine equation: a·x + b·y = c
    
    Parameters:
    a, b, c: integers
    
    Returns:
    tuple: (x0, y0, gcd) particular solution, or None if no solution exists
    """
    gcd, x, y = extended_euclidean_algorithm(a, b)
    
    # Check if solution exists
    if c % gcd != 0:
        print(f"\nNo integer solution exists because {c} is not divisible by gcd({a},{b}) = {gcd}")
        return None
    
    # Find particular solution
    factor = c // gcd
    x0 = x * factor
    y0 = y * factor
    
    print(f"\n{'='*60}")
    print(f"LINEAR DIOPHANTINE EQUATION: {a}·x + {b}·y = {c}")
    print(f"{'='*60}")
    print(f"GCD({a}, {b}) = {gcd}")
    print(f"Particular solution: x0 = {x0}, y0 = {y0}")
    print(f"General solution: x = {x0} + {b//gcd}·t, y = {y0} - {a//gcd}·t, where t ∈ ℤ")
    print(f"{'='*60}\n")
    
    return x0, y0, gcd

def main():
    """Interactive demonstration of Extended Euclidean algorithm"""
    print("\n" + "="*60)
    print("   EXTENDED EUCLIDEAN ALGORITHM CALCULATOR")
    print("="*60)
    
    while True:
        print("\nOptions:")
        print("1. Find GCD and coefficients (recursive)")
        print("2. Find GCD and coefficients (iterative)")
        print("3. Find GCD and coefficients (with step-by-step display)")
        print("4. Solve Linear Diophantine equation: a·x + b·y = c")
        print("5. Exit")
        
        choice = input("\nEnter your choice (1-5): ").strip()
        
        if choice == '5':
            print("\nThank you for using the Extended Euclidean Algorithm Calculator!")
            break
        
        if choice == '4':
            try:
                print("\n--- Solve Linear Diophantine Equation ---")
                a = int(input("Enter coefficient a: "))
                b = int(input("Enter coefficient b: "))
                c = int(input("Enter constant c: "))
                
                solve_linear_diophantine(a, b, c)
                
            except ValueError:
                print("❌ Error: Please enter valid integers!")
            continue
        
        if choice not in ['1', '2', '3']:
            print("Invalid choice! Please try again.")
            continue
        
        try:
            num1 = int(input("Enter first number (a): "))
            num2 = int(input("Enter second number (b): "))
            
            if choice == '1':
                gcd, x, y = extended_euclidean_algorithm(num1, num2)
                print(f"\n{'='*50}")
                print(f"RESULTS:")
                print(f"  GCD({num1}, {num2}) = {gcd}")
                print(f"  x = {x}, y = {y}")
                print(f"  Verification: {num1}·{x} + {num2}·{y} = {num1*x + num2*y}")
                print(f"{'='*50}")
            
            elif choice == '2':
                gcd, x, y = extended_euclidean_algorithm_iterative(num1, num2)
                print(f"\n{'='*50}")
                print(f"RESULTS:")
                print(f"  GCD({num1}, {num2}) = {gcd}")
                print(f"  x = {x}, y = {y}")
                print(f"  Verification: {num1}·{x} + {num2}·{y} = {num1*x + num2*y}")
                print(f"{'='*50}")
            
            elif choice == '3':
                gcd, x, y = extended_euclidean_with_steps(num1, num2)
        
        except ValueError:
            print("❌ Error: Please enter valid integers!")
        except Exception as e:
            print(f"❌ Error: {e}")

if __name__ == "__main__":
    main()