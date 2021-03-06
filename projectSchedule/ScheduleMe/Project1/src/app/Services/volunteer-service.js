"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var VolunteerService = (function () {
    function VolunteerService(http) {
        this.http = http;
    }
    VolunteerService.prototype.GetVolunteerFromServer = function () {
        return this.http.get("api/Volonteer/Get").map(function (data) { return data.json(); });
    };
    VolunteerService.prototype.saveAllVolunteersToServer = function (volunteersToSave) {
        return this.http.post("api/Volonteer/Post", volunteersToSave).map(function (res) { return true; });
    };
    VolunteerService.prototype.getVolunteerByIndex = function (index) {
        return this.http.post("api/Volonteer/GetVolunteerByDay", index).map(function (data) { return data.json(); });
    };
    return VolunteerService;
}());
VolunteerService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], VolunteerService);
exports.VolunteerService = VolunteerService;
//# sourceMappingURL=volunteer-service.js.map