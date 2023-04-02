"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkHasHL = exports.getBattleRoomHref = void 0;
const util_1 = require("../util");
// http://game.granbluefantasy.jp
const getBattleRoomHref = battleId => {
    // const body = { 'special_token': null, 'battle_key': battleId };
    // const url = '/quest/battle_key_check';
    (0, util_1.dispatchContentScriptToInject)({
        message: 'getBattleRoomHref',
        data: battleId,
    });
};
exports.getBattleRoomHref = getBattleRoomHref;
const checkHasHL = () => {
    (0, util_1.dispatchContentScriptToInject)({ message: 'checkHasHL' });
};
exports.checkHasHL = checkHasHL;
//# sourceMappingURL=battleCheck.js.map