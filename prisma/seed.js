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
const client_1 = require("@prisma/client");
const authController_1 = require("../src/controllers/authController");
const prisma_1 = require("../src/prisma");
const constants_1 = require("../src/utils/constants");
const ROLES = ["Superadmin", "Counsellor", "Frontdesk", "Account"];
const LANGUAGETYPES = ["IELTS", "PTE"];
const ADMISSIONTYPES = ["Class", "Booking"];
const Seed = {
    // createRoles: async () => {
    //   await prisma.$transaction(async (tx) => {
    //     for (const role of ROLES) {
    //       await tx.role.create({
    //         data: {
    //           name: role,
    //         },
    //       });
    //     }
    //   });
    // },
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
                    street1: "Pashupati Rd, Kamal Pokhari",
                    city: "Kathmandu",
                    state: "Bagmati",
                    postalcode: "44600",
                },
            });
            yield tx.branch.create({
                data: {
                    addressId: address.id,
                    name: "Kamal Pokhari",
                },
            });
        }));
    }),
    createCourseFields: () => __awaiter(void 0, void 0, void 0, function* () {
        const fields = [
            "Management & Commerce",
            "Information Technology",
            "Engineering & Related Technologies",
            "Architecture & Building",
            "Hospitality & Tourism",
            "Health",
            "Agriculture, Environment & Related Studies",
            "Natural & Physical Sciences",
            "Education",
            "Society & Culture",
            "Creative Arts",
            "Mixed Field Programs",
        ];
        yield prisma_1.prisma.courseField.createMany({
            data: fields.map((field) => ({ name: field })),
        });
    }),
    createCourseLevels: () => __awaiter(void 0, void 0, void 0, function* () {
        const levels = ["Masters by Research", "Masters", "Bachelors", "Diploma", "Year 12", "A Levels"];
        yield prisma_1.prisma.courseLevel.createMany({
            data: levels.map((field) => ({ name: field })),
        });
    }),
    createAdmin: () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, authController_1.signup)({
            firstname: 'Sudan',
            lastname: 'Suwal',
            branchId: constants_1.Branch.KamalPokhari,
            userType: client_1.Roles.Superadmin,
            email: 'sudosuwal@gmail.com',
            password: 'Password1@'
        });
    }),
    createCurrencies: () => __awaiter(void 0, void 0, void 0, function* () {
        const currencies = [{ symbol: '$', code: 'AUD' }, { symbol: '$', code: 'USD' }, { symbol: '£', code: 'GBP' }];
        yield prisma_1.prisma.currency.createMany({
            data: currencies
        });
    }),
    addExtraLevels: () => __awaiter(void 0, void 0, void 0, function* () {
        const levels = ["Year 12", "A Levels"];
        yield prisma_1.prisma.courseLevel.createMany({
            data: levels.map((field) => ({ name: field }))
        });
    })
};
const migrate = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("migrating....");
    yield Seed.createLanguageTypes();
    yield Seed.createAdmissionTypes();
    yield Seed.createAddress_Branch();
    yield Seed.createCourseFields();
    yield Seed.createCourseLevels();
    yield Seed.createAdmin();
});
migrate();
