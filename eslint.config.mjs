// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config({
    languageOptions : {
        parserOptions: {
            project:true,
            tsconfigRootDir:import.meta.dirname,
        },
    },
    files: ["**/*.ts"],
    extends : [
        eslint.configs.recommended,
        ...tseslint.configs.recommended,
    ],
    rules: {
        "no-console" : "error",
        'no-useless-catch': 0,
        quotes: ["error" , "single" , { allowTemplateLiterals: true}],
    }
});
