/**
 * multilanguagepage lifecycles
 *
 * After a new page is created or published, automatically generates translated
 * versions for all other enabled locales using the `translate` package (Google engine).
 */

import translate from 'translate';

translate.engine = 'google';

const CONTENT_TYPE = 'api::multilanguagepage.multilanguagepage';

function getISOCode(locale: string): string {
  return locale.split('-')[0].toLowerCase();
}

async function translateText(text: string, sourceLocale: string, targetLocale: string): Promise<string> {
  const sourceLang = getISOCode(sourceLocale);
  const targetLang = getISOCode(targetLocale);

  if (sourceLang === targetLang || !text) return text;

  console.log(`[multilanguagepage] translateText: "${text}" from ${sourceLang} → ${targetLang}`);
  const result = await translate(text, { from: sourceLang, to: targetLang });
  console.log(`[multilanguagepage] translateText result: "${result}"`);
  return result;
}

async function createLocalizations(documentId: string, sourceLocale: string, pageText: string, pageDesc: string | null) {
  console.log(`[multilanguagepage] createLocalizations called for documentId="${documentId}", sourceLocale="${sourceLocale}"`);

  let locales: any[];
  try {
    locales = await strapi.plugin('i18n').service('locales').find();
    console.log('[multilanguagepage] All locales:', locales.map((l: any) => l.code));
  } catch (err: any) {
    console.error('[multilanguagepage] Failed to fetch locales:', err);
    strapi.log.error(`[multilanguagepage] Could not fetch locales: ${err.message}`);
    return;
  }

  const targetLocales = locales.filter((l: any) => l.code !== sourceLocale);
  console.log('[multilanguagepage] Target locales:', targetLocales.map((l: any) => l.code));

  if (targetLocales.length === 0) {
    console.log('[multilanguagepage] No target locales — nothing to translate.');
    return;
  }

  for (const targetLocale of targetLocales) {
    console.log(`[multilanguagepage] Processing locale "${targetLocale.code}"...`);
    try {
      // ── Duplicate prevention ──────────────────────────────────────────────
      const existing = await (strapi.documents as any)(CONTENT_TYPE).findOne({
        documentId,
        locale: targetLocale.code,
      });

      console.log(`[multilanguagepage] Existing entry for "${targetLocale.code}":`, existing);

      if (existing) {
        console.log(`[multilanguagepage] Locale "${targetLocale.code}" already exists — skipping.`);
        continue;
      }

      // ── Translation ───────────────────────────────────────────────────────
      const translatedPageText = await translateText(pageText, sourceLocale, targetLocale.code);
      const translatedPageDesc = pageDesc
        ? await translateText(pageDesc, sourceLocale, targetLocale.code)
        : pageDesc;

      console.log(`[multilanguagepage] Translation result for "${targetLocale.code}":`, {
        translatedPageText,
        translatedPageDesc,
      });

      // ── Create via Document Service (Strapi v5) ───────────────────────────
      const created = await (strapi.documents as any)(CONTENT_TYPE).update({
        documentId,
        locale: targetLocale.code,
        data: {
          pageText: translatedPageText,
          pageDesc: translatedPageDesc,
        },
      });

      console.log(`[multilanguagepage] Created "${targetLocale.code}" localization:`, created);
      strapi.log.info(`[multilanguagepage] Created "${targetLocale.code}" for documentId="${documentId}".`);
    } catch (err: any) {
      console.error(`[multilanguagepage] Error for locale "${targetLocale.code}":`, err);
      strapi.log.error(`[multilanguagepage] Failed to create "${targetLocale.code}": ${err.message}`);
    }
  }

  console.log('[multilanguagepage] createLocalizations complete.');
}

export default {
  async afterCreate(event: any) {
    console.log('[multilanguagepage] afterCreate triggered');
    console.log('[multilanguagepage] afterCreate result:', JSON.stringify(event.result, null, 2));

    const { result } = event;
    const { documentId, locale: sourceLocale, pageText, pageDesc } = result;

    if (!sourceLocale || !documentId) {
      console.log('[multilanguagepage] afterCreate: Missing sourceLocale or documentId — aborting.', { documentId, sourceLocale });
      return;
    }

    await createLocalizations(documentId, sourceLocale, pageText, pageDesc);
  },

  async afterUpdate(event: any) {
    console.log('[multilanguagepage] afterUpdate triggered');
    console.log('[multilanguagepage] afterUpdate result:', JSON.stringify(event.result, null, 2));

    const { result } = event;
    const { documentId, locale: sourceLocale, pageText, pageDesc, publishedAt } = result;

    // Only run on publish (publishedAt just got set), not every save
    if (!publishedAt) {
      console.log('[multilanguagepage] afterUpdate: not a publish event — skipping.');
      return;
    }

    if (!sourceLocale || !documentId) {
      console.log('[multilanguagepage] afterUpdate: Missing sourceLocale or documentId — aborting.', { documentId, sourceLocale });
      return;
    }

    await createLocalizations(documentId, sourceLocale, pageText, pageDesc);
  },
};
