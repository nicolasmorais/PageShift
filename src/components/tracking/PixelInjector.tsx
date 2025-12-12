import { getDb } from '@/lib/database';
import { PixelConfig } from '@/lib/advertorial-types';

// Componente para injetar scripts de rastreamento no head
export async function PixelInjector() {
  const db = await getDb();
  const config: PixelConfig = db.data.pixelConfig;

  const { metaPixelId, taboolaPixelId, globalScripts } = config;

  // 1. Meta Pixel Script
  const metaScript = metaPixelId ? `
    <!-- Meta Pixel Code -->
    <script>
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${metaPixelId}');
      fbq('track', 'PageView');
    </script>
    <noscript>
      <img height="1" width="1" style="display:none"
           src="https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1"/>
    </noscript>
    <!-- End Meta Pixel Code -->
  ` : '';

  // 2. Taboola Pixel Script
  const taboolaScript = taboolaPixelId ? `
    <!-- Taboola Pixel Code -->
    <script type="text/javascript">
      window._tfa = window._tfa || [];
      window._tfa.push({notify: 'event', name: 'page_view', id: '${taboolaPixelId}'});
      !function (t, f, a, x) {
        if (!document.getElementById(x)) {
          t.async = 1;t.src = a;t.id = x;f.parentNode.insertBefore(t, f);
        }
      }(document.createElement('script'),
      document.getElementsByTagName('script')[0],
      '//cdn.taboola.com/libtrc/unip.js',
      'tb_loader_script');
    </script>
    <!-- End Taboola Pixel Code -->
  ` : '';

  // 3. Global Scripts (Injetado como HTML puro)
  const customScripts = globalScripts || '';

  const combinedScripts = metaScript + taboolaScript + customScripts;

  if (!combinedScripts) {
    return null;
  }

  // Usamos dangerouslySetInnerHTML para injetar os scripts no head
  return (
    <div dangerouslySetInnerHTML={{ __html: combinedScripts }} />
  );
}