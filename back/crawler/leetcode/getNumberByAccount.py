import json

import requests

__url = 'https://leetcode-cn.com/graphql/'
__headers = {
    "Host": "leetcode-cn.com",
    "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:91.0) Gecko/20100101 Firefox/91.0",
    "Accept": "*/*",
    "Accept-Language": "en-US",
    "Accept-Encoding": "gzip, deflate, br",
    "Content-Type": "application/json",
    "Origin": "https://leetcode-cn.com",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "Connection": "keep-alive",
    "Pragma": "no-cache",
    "Cache-Control": "no-cache",
    "TE": "trailers"
}

def __get_payload(account):
    return {
        "operationName":"userQuestionProgress",
        "variables":{"userSlug":account},
        "query":"""
            query userQuestionProgress($userSlug: String!) {
                userProfileUserQuestionProgress(userSlug: $userSlug) {
                    numAcceptedQuestions {
                        difficulty
                        count
                    }
                }
            }
        """
    }

def get_number(account)->int:
    r = requests.post(
        __url,
        headers = __headers,
        data = json.dumps(__get_payload(account)))
    data = json.loads(r.content)['data']
    data = data['userProfileUserQuestionProgress']
    data = data['numAcceptedQuestions']
    easy, medium, hard = 0, 0, 0
    for i in data:
        if i['difficulty'] == 'EASY':
            easy = i['count']
        elif i['difficulty'] == 'MEDIUM':
            medium = i['count']
        else:
            hard = i['count']
    r.close()
    return easy + medium + hard

