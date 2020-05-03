export function typeicon(value: string | number | null): string {
  if (value === null || !value) return '';

  // https://materialdesignicons.com/
  switch (value.toString()) {
    case 'all': return 'mdi-view-list'; // special case
    case 'note': return 'mdi-note-text';
    case 'task': return 'mdi-check-box-outline';
    case 'goal': return 'mdi-bullseye-arrow';
    case 'journal': return 'mdi-script-text';
    case 'activity': return 'mdi-run';
    case 'habit': return 'mdi-flash-circle';
    case 'routine': return 'mdi-autorenew';
    case 'weightmeasurement': return 'mdi-scale-bathroom';
    case 'bodymeasurement': return 'mdi-human-handsdown';
    case 'project': return 'mdi-format-list-checks';
    default: return 'mdi-crosshairs-question';
  }
}

export function typecolor(value: string | null): string {
  if (value === null || !value) return '';

  switch (value.toString()) {
    // case 'all': return ' darken-1'; // special case
    case 'note': return 'green darken-1';
    case 'task': return 'red darken-1';
    case 'goal': return 'blue darken-1';
    case 'journal': return 'cyan darken-1';
    case 'activity': return 'orange darken-1';
    case 'habit': return 'deep-orange darken-1';
    case 'routine': return 'brown darken-1';
    case 'weightmeasurement': return 'purple darken-1';
    case 'bodymeasurement': return 'pink darken-1';
    case 'project': return 'yellow darken-1';
    default: return 'gray darken-1';
  }
}
