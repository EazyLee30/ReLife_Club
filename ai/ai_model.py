import requests
import numpy as np

def ai_model(input_data):
    # 使用 coze.cn 的 API 接入智能体
    api_key = "your_coze_api_key"
    url = "https://api.coze.cn/v1/predict"
    headers = {"Authorization": f"Bearer {api_key}"}
    payload = {"input": input_data}
    response = requests.post(url, json=payload, headers=headers)
    return response.json().get('result', np.random.rand())

if __name__ == "__main__":
    print(ai_model("退休后如何规划生活？")) 