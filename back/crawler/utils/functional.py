import requests
from utils.consts import GRAPHQL


# Firstly, we need to get all accounts registered in our Database.
# So that we can crwal them later.
def get_accounts_from(source)->list[str]:
    params = {
        'query': '''{
            getUserAccount(id:null, source:"%s"){
                account
            }
        }''' % source
    }
    res = [_['account'] for _ in requests.post(url=GRAPHQL, params=params).json()['data']['getUserAccount']]
    return res

#Secondly, we update the data
def update(source, get_number):
    for i in get_accounts_from(source):
        solved = get_number(i)
        print(solved, i)
        params = {
            'query': '''mutation{
                insertSolved(solved:%d, account:"%s", source:"%s"){
                    solved
                }
            }
            '''% (solved, i, source)
        }
        print(requests.post(url=GRAPHQL, params=params).json())