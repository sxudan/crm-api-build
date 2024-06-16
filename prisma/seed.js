"use strict";
// import { PrismaClient } from '@prisma/client';
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
const prisma_1 = require("../src/prisma");
const ROLES = ['Superadmin', 'Counsellor', 'Frontdesk', 'Account'];
const LANGUAGETYPES = ['IELTS', 'PTE'];
const ADMISSIONTYPES = ['Class', 'Booking'];
const Seed = {
    createRoles: () => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            for (const role of ROLES) {
                yield tx.role.create({
                    data: {
                        name: role,
                    },
                });
            }
        }));
    }),
    createLanguageTypes: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield prisma_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
                for (const role of LANGUAGETYPES) {
                    yield tx.languageType.create({
                        data: {
                            name: role,
                        },
                    });
                }
            }));
        }
        catch (e) {
            console.log(e);
        }
    }),
    createAdmissionTypes: () => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            for (const role of ADMISSIONTYPES) {
                yield tx.languageAdmissionType.create({
                    data: {
                        name: role,
                    },
                });
            }
        }));
    }),
    createAddress_Branch: () => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            const address = yield tx.address.create({
                data: {
                    street1: 'Pashupati Rd, Kamal Pokhari',
                    city: 'Kathmandu',
                    state: 'Bagmati',
                    postalcode: '44600'
                }
            });
            yield tx.branch.create({
                data: {
                    addressId: address.id,
                    name: 'Kamal Pokhari'
                }
            });
        }));
    })
};
const migrate = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('migrating....');
    yield Seed.createRoles();
    yield Seed.createLanguageTypes();
    yield Seed.createAdmissionTypes();
    yield Seed.createAddress_Branch();
});
migrate();
