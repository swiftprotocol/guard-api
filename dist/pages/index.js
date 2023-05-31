"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', (_, res) => {
    return res.status(200).send(`
    <h2>Guard API</h2>
    <ul>
      <li><a href="/status">/status</a></li>
      <li><a href="/put/[address]/[key]">/put/[address]/[key]</li>
      <li><a href="/retrieve/[address]/[key]">/retrieve/[address]/[key]</a></li>
      <li><a href="/notify">/notify</li>
    </ul>
  `);
});
module.exports = router;
//# sourceMappingURL=index.js.map