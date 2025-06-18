import { createClient, createCustomer, getCustomer } from "../dist";

// PAY.JP APIキー
const API_KEY = "sk_test_c62fade9d045b54cd76d7036"; // ご自身のテスト用APIキーに置き換えてください

async function run() {
  try {
    const client = createClient({
      baseUrl: "http://localhost:8200",
      apiKey: API_KEY,
    });

    const customerResult = await createCustomer({
      client: client,
      body: {
        email: "payjpv2-test@example.com",
        description: "payjpv2クラスからの顧客作成テスト",
        metadata: {},
      },
    });

    if (customerResult.error) {
      console.error("顧客作成エラー:", customerResult.error);
      return;
    }

    console.log("顧客作成成功:", customerResult.data);

    if (customerResult.data?.id) {
      // ThrowOnError=trueを指定すると、エラーは例外としてthrowされる
      try {
        const getCustomerResult = await getCustomer({
          client: client,
          path: {
            customer_id: customerResult.data.id,
          },
        });

        // エラーがない場合のみここに到達
        console.log("顧客情報取得成功:", getCustomerResult.data);
      } catch (err) {
        console.error("顧客情報取得エラー:", err);
      }
    }
  } catch (err) {
    console.error("予期しないエラーが発生しました:", err);
  }
}

run();
