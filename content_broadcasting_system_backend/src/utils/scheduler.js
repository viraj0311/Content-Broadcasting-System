const pickActiveFromRotatingList = (items, now = new Date()) => {
  if (!items.length) return null;
  const safeItems = items.map((item) => ({
    ...item,
    duration_minutes: Number(item.duration_minutes || 5),
  }));
  const cycleDuration = safeItems.reduce((sum, item) => sum + item.duration_minutes, 0);
  if (!cycleDuration) return safeItems[0];

  const anchor = new Date(Math.min(...safeItems.map((item) => new Date(item.start_time).getTime())));
  const elapsedMinutes = Math.floor((now.getTime() - anchor.getTime()) / 60000);
  const mod = ((elapsedMinutes % cycleDuration) + cycleDuration) % cycleDuration;

  let running = 0;
  for (const item of safeItems) {
    running += item.duration_minutes;
    if (mod < running) return item;
  }

  return safeItems[0];
};

export { pickActiveFromRotatingList };
