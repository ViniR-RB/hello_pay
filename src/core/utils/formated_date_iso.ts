export function formatarDataParaISO8601(data: Date): string {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  const hora = String(data.getHours()).padStart(2, '0');
  const minuto = String(data.getMinutes()).padStart(2, '0');
  const segundo = String(data.getSeconds()).padStart(2, '0');
  const milissegundo = String(data.getMilliseconds()).padStart(3, '0');

  return `${ano}-${mes}-${dia} ${hora}:${minuto}:${segundo}.${milissegundo}`;
}
