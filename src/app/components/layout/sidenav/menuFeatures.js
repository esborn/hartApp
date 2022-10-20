import Permissions from "../../../common/enums/permissions.json";

export default class MenuFeatures {
    static get menuItems() {
        return [{
                "name": "HART Responses",
                "type": "link",
                "icon": "home",
                "state": "Home",
                "permissions": [Permissions.everyone]
            },
            {
                "name": "Admin",
                "state": "Dashboard",
                "type": "toggle",
                "icon": "supervisor_account",
                "permissions": [Permissions.admin],
                "pages": [
                    {
                        "name": "Users",
                        "state": "Users",
                        "type": "link",
                        "permissions": [Permissions.admin]
                    },
                    {
                        "name": "Regions",
                        "state": "Regions",
                        "type": "link",
                        "permissions": [Permissions.admin]
                    },
                    {
                        "name": "Countries",
                        "state": "Countries",
                        "type": "link",
                        "permissions": [Permissions.admin]
                    },
                    {
                        "name": "Reports",
                        "state": "ReportsList",
                        "type": "link",
                        "permissions": [Permissions.admin]
                    },
                    {
                        "name": "Response Codes",
                        "state": "ResponseCodesList",
                        "type": "link",
                        "permissions": [Permissions.admin]
                    }
                ]
            }
        ]
    }
}