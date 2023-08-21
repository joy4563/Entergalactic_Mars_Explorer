import requests

api_key = "DEMO_KEY"  # Replace with your actual API key
url = f"https://api.nasa.gov/insight_weather/?api_key={api_key}&feedtype=json&ver=1.0"

response = requests.get(url)

if response.status_code == 200:
    data = response.json()
    # Print the weather data
    print("Weather data:")
    print(data)
else:
    print("Error:", response.status_code)


# weather_data = {
#     'sol_keys': ['1219'],
#     'validity_checks': {
#         '1219': {
#             'AT': {'sol_hours_with_data': [6, 7, 8, 9, 10, 11, 12], 'valid': False},
#             'HWS': {'sol_hours_with_data': [6, 7, 8, 9, 10, 11, 12], 'valid': False},
#             'PRE': {'sol_hours_with_data': [6, 7, 8, 9, 10, 11, 12], 'valid': False},
#             'WD': {'sol_hours_with_data': [6, 7, 8, 9, 10, 11, 12], 'valid': False}
#         }
#     },
#     'sol_hours_required': 18,
#     'sols_checked': ['1219']
# }

# # Check if any sols have weather data
# if weather_data['sol_keys']:
#     print("Weather data available for sols:", weather_data['sol_keys'])
#     for sol_key in weather_data['sol_keys']:
#         validity_checks = weather_data['validity_checks'].get(sol_key, {})
#         print(f"Sol {sol_key}:")
#         for parameter, checks in validity_checks.items():
#             if checks['valid']:
#                 print(f"  {parameter}: Valid data")
#             else:
#                 print(f"  {parameter}: Invalid data")
# else:
#     print("No weather data available for any sols.")
