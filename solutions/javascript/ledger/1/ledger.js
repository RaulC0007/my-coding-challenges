class LedgerEntry {
  constructor(date, description, change) {
    // Crear fecha sin problemas de zona horaria
    // Parseamos la fecha manualmente para evitar problemas de timezone
    const parts = date.split('-');
    this.date = new Date(parts[0], parts[1] - 1, parts[2]);
    this.description = description;
    this.change = change;
  }
}

export function createEntry(date, description, change) {
  return new LedgerEntry(date, description, change);
}

// Configuración centralizada para cada locale
const LOCALE_CONFIGS = {
  'en-US': {
    headers: { date: 'Date', description: 'Description', change: 'Change' },
    formatDate: (date) => {
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      const yyyy = date.getFullYear();
      return `${mm}/${dd}/${yyyy}`;
    },
    formatCurrency: (change, currency) => {
      const value = Math.abs(change / 100);
      const options = {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      };
      const formatted = value.toLocaleString('en-US', options);
      return change < 0 ? `(${formatted})` : `${formatted} `;
    }
  },
  'nl-NL': {
    headers: { date: 'Datum', description: 'Omschrijving', change: 'Verandering' },
    formatDate: (date) => {
      const dd = String(date.getDate()).padStart(2, '0');
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const yyyy = date.getFullYear();
      return `${dd}-${mm}-${yyyy}`;
    },
    formatCurrency: (change, currency) => {
      const value = change / 100;
      const options = {
        style: 'currency',
        currency,
        currencyDisplay: 'narrowSymbol',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      };
      return `${value.toLocaleString('nl-NL', options)} `;
    }
  }
};

// Funciones auxiliares para tareas específicas
function formatDescription(description) {
  if (description.length > 25) {
    return `${description.substring(0, 22)}...`;
  }
  return description.padEnd(25, ' ');
}

function sortEntries(entries) {
  return [...entries].sort((a, b) => 
    a.date - b.date || 
    a.change - b.change || 
    a.description.localeCompare(b.description)
  );
}

export function formatEntries(currency, locale, entries) {
  const config = LOCALE_CONFIGS[locale];
  if (!config) throw new Error(`Unsupported locale: ${locale}`);

  // 1. Generar encabezado
  const header = [
    config.headers.date.padEnd(10, ' '),
    config.headers.description.padEnd(25, ' '),
    config.headers.change.padEnd(13, ' ')
  ].join(' | ') + '\n';

  // 2. Ordenar entradas
  const sortedEntries = sortEntries(entries);

  // 3. Formatear cada fila
  const rows = sortedEntries.map(entry => {
    const dateStr = config.formatDate(entry.date);
    const descStr = formatDescription(entry.description);
    const changeStr = config.formatCurrency(entry.change, currency).padStart(13, ' ');
    
    return `${dateStr} | ${descStr} | ${changeStr}`;
  });

  // 4. Unir todo y remover el salto de línea final si existe
  return (header + rows.join('\n')).replace(/\n$/, '');
}