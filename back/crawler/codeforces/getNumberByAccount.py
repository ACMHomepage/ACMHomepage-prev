import requests


def get_number(account):
    result = 0
    problemCommitted = requests.post(url="https://codeforces.com/api/user.status?handle=%s&from=1" % account).json()['result']
    for problem in problemCommitted:
        if problem['verdict'] == 'OK':
            result += 1
    return result
