import React from 'react';
import { Button } from './ui/button';
import { useTranslation } from 'react-i18next';

export function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const changeLanguage = (langCode: string) => {
        i18n.changeLanguage(langCode);
    };

    return (
        <div className="flex items-center gap-1">
            <Button
                variant={i18n.language === 'en' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => changeLanguage('en')}
                className="text-xs px-2 h-8"
            >
                EN
            </Button>
            <Button
                variant={i18n.language === 'hi' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => changeLanguage('hi')}
                className="text-xs px-2 h-8"
            >
                हिंदी
            </Button>
            <Button
                variant={i18n.language === 'te' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => changeLanguage('te')}
                className="text-xs px-2 h-8"
            >
                తెలుగు
            </Button>
        </div>
    );
}
