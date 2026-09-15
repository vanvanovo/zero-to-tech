import requests

resp = requests.get("http://ip-api.com/json", timeout=10)
print(resp.json())
