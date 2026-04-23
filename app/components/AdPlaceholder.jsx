export default function AdPlaceholder() {
  return (
    <div style={{
      width: '100%',
      maxWidth: '728px',
      height: '90px',
      margin: '0 auto 2rem auto',
      backgroundColor: '#eeeeee',
      border: 'var(--border-thick)',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '4px 4px 0px 0px rgba(0,0,0,0.2)'
    }}>
      <div style={{
        position: 'absolute',
        top: '-12px',
        left: '-4px',
        backgroundColor: 'var(--color-yellow)',
        border: '3px solid var(--color-black)',
        padding: '2px 8px',
        fontSize: '0.7rem',
        fontWeight: 900,
        textTransform: 'uppercase',
        letterSpacing: '1px'
      }}>
        SPONSORED
      </div>
      <p style={{
        color: '#888',
        fontFamily: 'monospace',
        fontWeight: 700,
        fontSize: '1rem',
        margin: 0
      }}>
        [ ADVERTISEMENT SPACE ]
      </p>
    </div>
  );
}
