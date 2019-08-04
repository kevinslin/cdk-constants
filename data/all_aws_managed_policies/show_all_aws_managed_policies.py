import boto3
from datetime import datetime
import json

def json_serial(obj):
    """JSON serializer for objects not serializable by default json code"""

    if isinstance(obj, datetime):
        serial = obj.isoformat()
        return serial
    raise TypeError ("Type not serializable")

client = boto3.client('iam')

policies = {}

paginator = client.get_paginator('list_policies')
response_iterator = paginator.paginate(Scope='AWS')
for response in response_iterator:
    for policy in response['Policies']:
        policies[policy['PolicyName']] = policy

for policy_name in policies:
    response = client.get_policy_version(
        PolicyArn=policies[policy_name]['Arn'],
        VersionId=policies[policy_name]['DefaultVersionId'])
    for key in response['PolicyVersion']:
        policies[policy_name][key] = response['PolicyVersion'][key]
         
print(json.dumps(policies,
                 sort_keys=True,
                 indent=4,
                 separators=(',', ': '),
                 default=json_serial))