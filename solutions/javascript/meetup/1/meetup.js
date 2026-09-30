export const meetup = (year, month, week, dayOfWeek) => {
  // Mapeo de nombres de días a números (0-6)
  const dayOfWeekMap = {
    'Sunday': 0,
    'Monday': 1,
    'Tuesday': 2,
    'Wednesday': 3,
    'Thursday': 4,
    'Friday': 5,
    'Saturday': 6
  };
  
  // Convertir dayOfWeek a número si es una cadena
  const dayNum = typeof dayOfWeek === 'string' ? dayOfWeekMap[dayOfWeek] : dayOfWeek;
  
  if (dayNum === undefined || dayNum < 0 || dayNum > 6) {
    throw new Error('Día de la semana inválido');
  }

  const meetupMonth = month - 1; // Ajuste para el índice de mes (0-11)
  let candidateDate;

  const daysInMonth = new Date(year, meetupMonth + 1, 0).getDate();

  switch (week) {
    case 'first':
    case 'second':
    case 'third':
    case 'fourth':
    case 'fifth': {
      let count = 0;
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, meetupMonth, day);
        if (date.getDay() === dayNum) {
          count++;
          if (count === getWeekNumber(week)) {
            candidateDate = date;
            break;
          }
        }
      }
      break;
    }
    case 'last': {
      for (let day = daysInMonth; day >= 1; day--) {
        const date = new Date(year, meetupMonth, day);
        if (date.getDay() === dayNum) {
          candidateDate = date;
          break;
        }
      }
      break;
    }
    case 'teenth': {
      for (let day = 13; day <= 19; day++) {
        const date = new Date(year, meetupMonth, day);
        if (date.getDay() === dayNum) {
          candidateDate = date;
          break;
        }
      }
      break;
    }
    default:
      throw new Error('Tipo de semana no válido');
  }

  if (!candidateDate) {
    throw new Error('No se pudo encontrar la fecha para el meetup.');
  }

  return candidateDate;
};

const getWeekNumber = (weekString) => {
  switch (weekString) {
    case 'first': return 1;
    case 'second': return 2;
    case 'third': return 3;
    case 'fourth': return 4;
    case 'fifth': return 5;
    default: return 0;
  }
};

export const Monday = 1;
export const Tuesday = 2;
export const Wednesday = 3;
export const Thursday = 4;
export const Friday = 5;
export const Saturday = 6;
export const Sunday = 0;