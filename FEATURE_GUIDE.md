# Scientific Calculator - Feature Guide

## Quick Start Guide

### Basic Calculations
Simply click numbers and operators to perform calculations:
- Click `7` → `+` → `3` → `=` to get 10
- Click `5` → `×` → `4` → `=` to get 20

### Clear Functions
- **AC (All Clear)**: Clears everything including memory and pending operations
- **CE (Clear Entry)**: Clears only the current number
- **⌫ (Backspace)**: Deletes the last digit

### Memory Operations
1. Calculate a number: `5` → `+` → `3` → `=` (shows 8)
2. Store in memory: Click `MS`
3. Do other calculations
4. Recall memory: Click `MR` (brings back 8)
5. Add to memory: Calculate a new number, click `M+`
6. Clear memory: Click `MC`

### Scientific Functions

#### Trigonometry
- Use `RAD` or `DEG` toggle to switch between radians and degrees
- Calculate sine: Click `sin` → enter value → auto-calculates
- Example: `sin` → `π` = 0 (because sin(π) = 0)
- Same for `cos`, `tan`, `asin`, `acos`, `atan`

#### Logarithms
- `ln`: Natural logarithm (base e)
- `log`: Common logarithm (base 10)
- `exp`: e raised to the power of x (e^x)

#### Powers and Roots
- `x²`: Square a number
- `x³`: Cube a number
- `xʸ`: Raise x to the power of y (enter x → click xʸ → enter y → =)
- `√`: Square root
- `∛`: Cube root

#### Constants
- `π`: Pi (3.14159...)
- `e`: Euler's number (2.71828...)

#### Advanced Functions
- `n!`: Factorial (5! = 120)
- `|x|`: Absolute value
- `1/x`: Reciprocal (1 divided by x)
- `mod`: Modulo operation (remainder)
- `sinh`, `cosh`, `tanh`: Hyperbolic functions

## Usage Examples

### Example 1: Calculate the area of a circle
```
Radius = 5
Area = π × r²

Steps:
1. Click: 5
2. Click: x² (shows 25)
3. Click: × 
4. Click: π
5. Click: =
Result: ~78.54 square units
```

### Example 2: Solve a compound calculation
```
Calculate: √(25 + 16)

Steps:
1. Click: 25
2. Click: +
3. Click: 16
4. Click: =  (shows 41)
5. Click: √
Result: ~6.4
```

### Example 3: Trigonometric calculation
```
Calculate: sin(45°)

Steps:
1. Toggle to DEG mode
2. Click: sin
3. Click: 45
4. Auto-calculates
Result: ~0.707
```

### Example 4: Using Memory
```
Store 100, add several numbers, recall

Steps:
1. Click: 100
2. Click: MS (memory stored)
3. Click: 25
4. Click: M+ (adds 25 to memory, now 125)
5. Click: 50
6. Click: M+ (adds 50 to memory, now 175)
7. Click: MR
Result: 175
```

## History Panel Features

- **Auto-Save**: Every calculation is automatically saved
- **Click to Reuse**: Click any history item to load that result into the display
- **Recent Calculations**: Shows your last 10 calculations
- **Clear History**: Click "Clear History" button to remove all entries

## Keyboard Shortcuts Reference

| Function | Key | Example |
|----------|-----|---------|
| Enter number | 0-9 | Press `5` for 5 |
| Decimal | . | Press `.` for decimal point |
| Add | + | Press `+` for addition |
| Subtract | - | Press `-` for subtraction |
| Multiply | * | Press `*` for multiplication |
| Divide | / | Press `/` for division |
| Calculate | Enter or = | Complete calculation |
| Clear | Esc | Clear everything |
| Delete | Backspace | Remove last digit |
| Percent | % | Convert to percentage |

## Tips & Tricks

1. **Chain Calculations**: Results automatically become the input for your next operation
   - `5` + `3` = `8`, then immediately `×` `2` = `16`

2. **Use History**: Click any previous calculation to instantly load that result

3. **Keyboard First**: For fastest input, use keyboard shortcuts

4. **Angle Mode**: Always check if you're in RAD or DEG mode for trig functions

5. **Error Handling**: If you get NaN or Infinity, clear and try again

6. **Memory as Storage**: Use memory to store intermediate results in complex calculations

## Common Calculations

### Convert degrees to radians
```
Degrees × π ÷ 180

Example: 90° to radians
90 × π ÷ 180 = 1.571 (π/2)
```

### Calculate compound interest
```
Principal × (1 + rate)^years

Example: $1000 at 5% for 3 years
1000 × 1.05 xʸ 3 = $1157.63
```

### Pythagorean theorem
```
c = √(a² + b²)

Example: a=3, b=4
3 x² + 4 x² = 25 → √ = 5
```

## Responsiveness

This calculator works on:
- ✅ Desktop computers
- ✅ Tablets
- ✅ Smartphones
- ✅ Any modern web browser

Enjoy calculating! 🧮
