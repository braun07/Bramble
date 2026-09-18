import { useTranslation } from 'react-i18next';

export function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="flex items-center justify-between w-100 px-30 md:px-60 xxl:px-120 py-25 bg-gradient-to-r from-bramble to-bramble-2 fw-300 text-20 lg:text-28 line-h-140">
            <span>© Braun Design.</span>
            <span>{t('footer.copyright')}</span>
        </footer>
    );
}