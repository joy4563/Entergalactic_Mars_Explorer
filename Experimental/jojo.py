# import sys

# def main():
#     if len(sys.argv) != 2:
#         print("Usage: python script.py <input_file>")
#         return

#     input_file = sys.argv[1]
#     with open(input_file, 'r') as file:
#         lines = file.readlines()

#     line_numbers = [2, 9, 16, 23, 30, 37, 44, 51, 58, 65, 72, 79, 86, 93, 100, 107, 114, 121, 128]
#     for number in line_numbers:
#         if number < len(lines):
#             print(f"Line {number}: {lines[number - 1].strip()}")
#             if number + 1 < len(lines):
#                 print(f"Next Line {number + 1}: {lines[number].strip()}")
#             print()

# if __name__ == "__main__":
#     main()


import sys

def main():
    if len(sys.argv) != 2:
        print("Usage: python script.py <input_file>")
        return

    input_file = sys.argv[1]
    with open(input_file, 'r') as file:
        lines = file.readlines()

    line_numbers = [2, 9, 16, 23, 30, 37, 44, 51, 58, 65, 72, 79, 86, 93, 100, 107, 114, 121, 128]
    
    types = {}
    names = {}

    for number in line_numbers:
        if number < len(lines):
            entry = lines[number - 1].strip()
            next_line = lines[number].strip() if number + 1 < len(lines) else ""
            type_match = next_line.split(":")[0] if next_line else None

            if type_match and "Type" in entry and "Name" in next_line:
                type_value = entry.split(":")[1].strip()
                name_value = next_line.split(":")[1].strip()

                if type_value in types:
                    types[type_value] += 1
                else:
                    types[type_value] = 1

                if type_value not in names:
                    names[type_value] = []
                names[type_value].append(name_value)

    sorted_types = sorted(types.items(), key=lambda x: x[0])

    for type_name, count in sorted_types:
        names_list = ", ".join(names[type_name])
        print(f"{type_name}: {count} ({names_list})")

if __name__ == "__main__":
    main()
