import splunk.Intersplunk 
import base64
import splunk.mining.dcutils as dcu
import requests
import json

logger = dcu.getLogger()

results,unused1,unused2 = splunk.Intersplunk.getOrganizedResults()
#url = "http://10.10.20.134:9998/api-tticket";
url = "http://10.10.20.24:9998/api-tticket"

try:
        for result in results:
                obj = { 
                        "ClienteControle": "" + result["CODIGO_PRIMESYS"] + "", 
                        "Operacao": "Inserir",
                        "Atividade": "",
                        "DataCriacao": "" + result['data'] + "",
                        "IdentificacaoTTCliente": "" + result['incident_id'] + "",
                        "Origem": "Splunk",
                        "FlagProAtivo": "Y",
                        "Sintoma": "NENHUM",
                        "SistemaOrigem": "Splunk",
                        "ServicoAfetado": "" + result["Servico"] + "",
                        "UsuarioFinal": result['title'],
                        "SeverityCode": "",
                        "Link": "https://200.174.115.96:8000/en-US/app/alert_manager/incident_posture/",
                        "Descricao": result['title'],
                        "SolutionId": "" + result['Solucao'] + "",
                        "Contato" : "" + result['realname'] + "" ,
                        "Email" : "" + result['email'] + "" 
                }

                headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
                x = requests.post(url, data=json.dumps(obj), headers=headers)
                result["envelope"] = obj
                result["retorno"] = x.text
except Exception as e:
        result["Erro"] = e
        pass

splunk.Intersplunk.outputResults(results)

