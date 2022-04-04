import Api from "./Api.js";
import AES from "./AES.js";

export default class BioSig {
  static async connect() {
    const params = Api.paramBuilder({
      ts: new Date().getTime(),
    }).slice(1);

    const encryptedArgs = AES.encrypt(params);
    const b64Args = Buffer.from(encryptedArgs).toString("base64");
    console.log("b64Args - ", b64Args);
    const { success, response, raw } = await Api.call(
      "get",
      "https://sandbox.verifyexpress.com/interface/standard/unumbox/ssoinbound.aspx",
      null,
      { args: b64Args }
    );
    console.log("response - ", raw);
  }
}
