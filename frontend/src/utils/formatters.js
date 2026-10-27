export function formatCurrency(amount) {
  if (!amount && amount !== 0) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatDate(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function getPriorityColor(priority) {
  switch (priority) {
    case 'HOT':
      return 'bg-rose-950 text-rose-300 border-rose-800';
    case 'HIGH':
      return 'bg-amber-950 text-amber-300 border-amber-800';
    case 'MEDIUM':
      return 'bg-blue-950 text-blue-300 border-blue-800';
    default:
      return 'bg-slate-800 text-slate-400 border-slate-700';
  }
}
