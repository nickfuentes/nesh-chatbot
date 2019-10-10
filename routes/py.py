def build_df_response(answer=None, data=None, output_contexts=None):
    res = {"payload": {}}
    if answer is not None:
        res["fulfillmentText"] = str(answer)
    if data is not None:
        res["payload"]["data"] = data
    if output_contexts is not None:
        res["outputContexts"] = output_contexts
    res = json.dumps(res)
    r = make_response(res)
    r.headers["Content-Type"] = "application/json"
    return r
