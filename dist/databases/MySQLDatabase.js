"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQLDatabase = void 0;
const promise_1 = require("mysql2/promise");
const messages_1 = require("../config/messages");
class MySQLDatabase {
    constructor(config) {
        this.pool = (0, promise_1.createPool)(config);
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.connection = yield this.pool.getConnection();
                console.log((0, messages_1.successMessage)('Connected to MySQL database'));
            }
            catch (error) {
                console.error((0, messages_1.errorMessage)('Error connecting to MySQL database:' + error.message));
                throw error;
            }
        });
    }
    query(sql) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.connection) {
                    const [rows, fields] = yield this.connection.query(sql);
                    return rows;
                }
                else {
                    console.error((0, messages_1.errorMessage)('Connection is not available.'));
                    // Handle the case where there's no valid connection
                    throw new Error((0, messages_1.errorMessage)('No valid connection available.'));
                }
            }
            catch (error) {
                console.error((0, messages_1.errorMessage)('Error executing query:' + error.message));
                throw error;
            }
        });
    }
    end() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.connection) {
                    this.connection.release();
                    console.log((0, messages_1.successMessage)('Disconnected from MySQL database'));
                }
                else {
                    console.error((0, messages_1.errorMessage)('Connection is not available.'));
                }
            }
            catch (error) {
                console.error((0, messages_1.errorMessage)('Error disconnecting from MySQL database:' + error.message));
                throw error;
            }
        });
    }
}
exports.MySQLDatabase = MySQLDatabase;
