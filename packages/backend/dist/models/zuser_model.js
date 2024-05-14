"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const userSchema = zod_1.z.object({
    // password: z.string().min(3).max(10).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
    //     message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
    //   }),
    email: zod_1.z.string().email(),
});
exports.default = userSchema;
//# sourceMappingURL=zuser_model.js.map