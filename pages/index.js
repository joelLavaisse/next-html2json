import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [html, setHtml] = React.useState('');
  const [json, setJson] = React.useState('');

  const transformHtml = async () => {
    try {
      const response = await fetch('/api/minify', {
        method: 'POST',
        body: JSON.stringify({ html }),
        headers: { 'Content-Type': 'application/json' },
      }).then(res => res.json());
      setJson(JSON.stringify(response.html));
    } catch (err) {
      console.error(err);
    }
  }

  const copyToClipboard = () => {
    const text = document.getElementById('jsonTextArea');
    text.select();
    document.execCommand('copy');
    console.log(text);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Html to JSON with Next</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.grid}>
          <div className={styles.mainElement}>
            <div className={styles.mainElement__header}>
              <h2 className={styles.title}>HTML</h2>
            </div>
            <div className={styles.card}>
              <textarea id="htmlTextArea" type="text" value={html} className={styles.textInput} autoFocus onChange={(e) => setHtml(e.target.value)} />
            </div>
          </div>
          <div className="middle__spacer">
            <button type="button" onClick={() => transformHtml()}>Convertir</button>
          </div>
          <div className={styles.mainElement}>
            <div className={styles.mainElement__header}>
              <h2 className={styles.title}>JSON</h2>
              <button type="button" onClick={() => copyToClipboard()}>Copiar</button>
            </div>
            <div className={styles.card}>
              <textarea id="jsonTextArea" type="text" value={json} className={styles.textInput} readonly />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
