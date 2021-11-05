import splunk.Intersplunk
import base64
import splunk.mining.dcutils as dcu

logger = dcu.getLogger()

results,unused1,unused2 = splunk.Intersplunk.getOrganizedResults()

_multiplier = 1000
_keysHostPort = ['host', 'snmp_index']
_keys = ['ifName', 'ifAlias', 'ifHCInOctets', 'ifHCOutOctets', 'ifSpeed', 'ifHighSpeed', 'ifOutOctets', 'ifInOctets', 'ifInDiscards', 'ifOutDiscards', 'ifInErrors', 'ifOutErrors', 'ifHCInUcastPkts', 'ifHCOutUcastPkts', 'ifInUcastPkts', 'ifOutUcastPkts']
_lastValue = {}

def setLastValue(event):
        for key in _keys:
                if key in event:
                        _lastValue[key] = event[key]

        for key in _keysHostPort:
                _lastValue[key] = event[key]

        _lastValue["_time"] = event["_time"]

def isSameHostPort(event):
        exist=True
        if len(_lastValue) < 1:
                return False

        for key in _keysHostPort:
                if _lastValue[key] <> event[key]:
                        exist = False

        return exist

def calculateBandwidthCounter64(event, field, divisor):
        if _lastValue[field] == "" or event[field] == "" or event[field] == " ":
           return ""

        lastValue = long(float(_lastValue[field]))
        lastDate  = long(float(_lastValue['_time']))
        currValue = long(float(event[field]))
        currDate  = long(float(event['_time']))

        if currValue < lastValue:
                currValue = 18446744073709551615 + currValue

        seconds_between_metrics = currDate - lastDate
        delta = currValue-lastValue
        bps = (delta * 8) / seconds_between_metrics / divisor

        return bps

def calculateBandwidthCounter32(event, field, divisor):
        if _lastValue[field] == "" or event[field] == "" or event[field] == " ":
           return ""

        lastValue = long(float(_lastValue[field]))
        lastDate  = long(float(_lastValue['_time']))
        currValue = long(float(event[field]))
        currDate  = long(float(event['_time']))

        if currValue < lastValue:
                currValue = 4294967295 + currValue

        seconds_between_metrics = currDate - lastDate
        delta = currValue-lastValue
        bps = (delta * 8) / seconds_between_metrics / divisor

        return bps

def calculateDiferenceCounter64(event, field):
        if _lastValue[field] == "" or event[field] == "":
           return ""

        lastValue = long(float(_lastValue[field]))
        currValue = long(float(event[field]))
        if currValue < lastValue:
                currValue = 18446744073709551615 + currValue

        value = currValue - lastValue
        return value

def calculateDiference(event, field):
        if _lastValue[field] == "" or event[field] == "":
           return ""

        lastValue = long(float(_lastValue[field]))
        currValue = long(float(event[field]))
        if currValue < lastValue:
                currValue = 4294967295 + currValue

        value = currValue - lastValue
        return value

def calculateSpeedInterface(event):
        ifHighSpeed = 0
        ifSpeed = 0
        #Separa o valor das metricas
        if 'ifHighSpeed' in event:
            ifHighSpeed = event['ifHighSpeed']

        if 'ifSpeed' in event:
           ifSpeed = event['ifSpeed']

        if ifHighSpeed != "" and long(float(ifHighSpeed)) > 0 :
           ifHighSpeed = long(float(ifHighSpeed))
           ifHighSpeed = ifHighSpeed * 1000 * 1000
           result["ifSpeedBytes"] = ifHighSpeed
        else:
           result["ifSpeedBytes"] = ifSpeed

def calculateBandwidthPercHC(speed, bps):
        logger.info(speed)
        if speed == "" or bps == "" or long(float(speed)) < 1:
           return ""

        bps = long(float(bps)) * 100
        perc = float(bps) / long(float(speed))
        return perc

try:
        for result in results:
                calculateSpeedInterface(result)
                isSame = isSameHostPort(result)
                if (isSame == True):
                        # CALCULA OS BPS
                        if 'ifHCInOctets' in result:
                                result['HC_IN_BPS'] = calculateBandwidthCounter64(result, 'ifHCInOctets', 1)
                        if 'ifHCOutOctets' in result:
                                result['HC_OUT_BPS'] = calculateBandwidthCounter64(result, 'ifHCOutOctets', 1)
                        if 'ifInOctets' in result:
                                result['IN_BPS'] = calculateBandwidthCounter32(result, 'ifInOctets', 1)
                        if 'ifOutOctets' in result:
                                result['OUT_BPS'] = calculateBandwidthCounter32(result, 'ifOutOctets', 1)
                        if ('ifSpeed' in result and 'IN_BPS' in result):
                                result['IN_PERC'] = calculateBandwidthPercHC(result['ifSpeedBytes'], result['IN_BPS'])
                                result['BandwidthInUsagePerc'] = result['IN_PERC']
                        if ('ifSpeed' in result and 'OUT_BPS' in result):
                                result['OUT_PERC'] = calculateBandwidthPercHC(result['ifSpeedBytes'], result['OUT_BPS'])
                                result['BandwidthOutUsagePerc'] = result['OUT_PERC']                                    
                        if ('ifHighSpeed' in result and 'HC_IN_BPS' in result):
                                result['HC_IN_PERC'] = calculateBandwidthPercHC(result['ifSpeedBytes'], result['HC_IN_BPS'])
                                result['BandwidthInUsagePerc'] = result['HC_IN_PERC']
                        if ('ifHighSpeed' in result and 'HC_OUT_BPS' in result):
                                result['HC_OUT_PERC'] = calculateBandwidthPercHC(result['ifSpeedBytes'], result['HC_OUT_BPS'])
                                result['BandwidthOutUsagePerc'] = result['HC_OUT_PERC']                            
                        if 'ifHCInUcastPkts' in result:
                                result['HC_IN_UCASTPKTS'] = calculateDiference(result, 'ifHCInUcastPkts')
                        if 'ifHCOutUcastPkts' in result:
                                result['HC_OUT_UCASTPKTS'] = calculateDiference(result, 'ifHCOutUcastPkts')

                        # DISCARDS AND ERROS
                        if 'ifInDiscards' in result:
                                result['IN_DISCARDS'] = calculateDiference(result, 'ifInDiscards')
                        if 'ifOutDiscards' in result:
                                result['OUT_DISCARDS'] = calculateDiference(result, 'ifOutDiscards')
                        if 'ifInErrors' in result:
                                result['IN_ERRORS'] = calculateDiference(result, 'ifInErrors')
                        if 'ifOutErrors' in result:
                                result['OUT_ERRORS'] = calculateDiference(result, 'ifOutErrors')

                setLastValue(result)
except Exception as e:
        result["Erro"] = e
        pass

splunk.Intersplunk.outputResults(results)