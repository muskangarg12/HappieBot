# A very simple Flask Hello World app for you to get started with...
from flask import Flask, request, render_template,flash,redirect,session,abort,jsonify
#from __future__ import print_function
from gensim.corpora.dictionary import Dictionary
from keras.models import load_model
from gensim.parsing.preprocessing import strip_non_alphanum, preprocess_string
import numpy as np

app = Flask(__name__)

model = load_model('/home/deptest/DepChatbot/chatbot_model/model_bot_nn.h5')
vocab = Dictionary.load('/home/deptest/DepChatbot/chatbot_model/vocab_sentiment')

def predict(text):
    print("text:")
    print(text)
    preprocessed = [word[:-3] if word[-3:] == 'xxx' else word for word in
                    preprocess_string(text.lower().replace('not', 'notxxx'))]
    txt_list = [(vocab.token2id[word] + 1) for word in preprocessed
                if word in vocab.token2id.keys()]
    txt_list = [txt_list]
    max_tweet_len = 20
    if len(txt_list[0]) < max_tweet_len:
        print("Entered loop1")
        for i in range(max_tweet_len - len(txt_list[0])):
            print("iterating 1")
            txt_list[0].append(0)
    elif len(txt_list[0]) > max_tweet_len:
        print("Entered loop2")
        while len(txt_list[-1]) > max_tweet_len:
            print("iterating 2")
            txt_list.append(txt_list[-1][max_tweet_len:])
            txt_list[-2] = txt_list[-2][:max_tweet_len]
    prediction = 0
    for txt in txt_list:
        print("iterating 3")
        prediction += model.predict(np.array([txt]), batch_size=1)
    prediction /= len(txt_list)
    print("prediction:")
    print(prediction)
    return prediction[0][0]

@app.route('/')
def root():
    return render_template('index.html')


@app.route("/chatbot")
def chatbot():
    return render_template("index.html")

@app.route("/ask", methods=["POST"])
def ask():
    json_text = request.get_json()
    text = json_text
    bot_response = predict(text)
    #print(bot_response)
    return jsonify(({'status':'OK','answer':bot_response.astype(float)}))


#app.secret_key = os.urandom(12)
#app.run(port=5987, host='0.0.0.0', debug=True)