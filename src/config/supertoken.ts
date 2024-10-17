// supertokensConfig.ts
import ThirdParty, {
    Google,
    Github,
    Apple,
} from 'supertokens-auth-react/recipe/thirdparty';
import Session from 'supertokens-auth-react/recipe/session';
import { SuperTokensConfig } from 'supertokens-auth-react/lib/build/types';
import { getUserStatus } from '../api/auth'; // Ensure this function works with your API setup
import { NavigateFunction } from 'react-router-dom';

const appInfo = {
    appName: 'Hackathon E-Cell',
    apiDomain: process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8080',
    websiteDomain: process.env.REACT_APP_FRONTEND_URL ?? 'http://localhost:8080',
    apiBasePath: '/auth',
    websiteBasePath: '/login',
};

export const frontendConfig = (navigate: NavigateFunction): SuperTokensConfig => {
    return {
        appInfo,
        getRedirectionURL: async (context) => {
            if (context.action === "SUCCESS" && context.newSessionCreated) {
                if (context.redirectToPath !== undefined) {
                    return context.redirectToPath;
                }

                const status = await getUserStatus();
                if (status === 0) {
                    return "/register";
                } else if (status === 1) {
                    return "/admin";
                } else {
                    return "/dashboard";
                }
            }
            return undefined;
        },
        recipeList: [
            ThirdParty.init({
                style: `
                    /* Your custom styles here */
                `,
                signInAndUpFeature: {
                    providers: [
                        Google.init(),
                    ],
                    
                    termsOfServiceLink: "",
                    privacyPolicyLink: "" 
                },
                
                useShadowDom: false,
            }),
            Session.init(),
        ],
        windowHandler: (orig) => {
            return {
                ...orig,
                location: {
                    ...orig.location,
                    assign: (url) => navigate(url.toString()), 
                    setHref: (url) => navigate(url.toString()),
                },
            };
        },
    };
};
