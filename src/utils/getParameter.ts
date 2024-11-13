import { SSMClient, GetParametersByPathCommand, GetParameterCommand } from "@aws-sdk/client-ssm";
import { fromIni } from "@aws-sdk/credential-providers";

const ssm = new SSMClient({ 
    region: 'eu-central-1'
});

export const getSSMParameterByPath = async (env: String) => {
    let result = await ssm.send(new GetParametersByPathCommand({
        Path: `/${env}`,
        Recursive: true,
        WithDecryption: true
    }));
    let nextToken = result.NextToken;
    let params = result.Parameters;
    while(nextToken) {
        result = await ssm.send(new GetParametersByPathCommand({
            Path: `/${env}`,
            Recursive: true,
            WithDecryption: true,
            NextToken: nextToken
        }));
        params = params?.concat(result.Parameters || []);
        nextToken = result.NextToken;
    }
    return params;
}

export const getSSMParameter = async (env: String, key: String) => {
    return await ssm.send(new GetParameterCommand({
        Name: `/${env}/${key}`,
        WithDecryption: true
    }));
}