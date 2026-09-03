const mergeCopy = (base, override) => {
  if (!override || typeof override !== 'object' || Array.isArray(override)) {
    return override === undefined ? base : override;
  }

  return Object.fromEntries(
    Object.keys(base).map((key) => [key, mergeCopy(base[key], override[key])]),
  );
};

export function createLocalizedCopy(base, translation) {
  const work = base.experience.work.map((job, index) => {
    const translatedJob = translation.experience.work[index];

    return {
      ...job,
      period: translatedJob.period,
      description: [translatedJob.before, job.description[1], translatedJob.after],
    };
  });
  const skillGroups = base.experience.skillGroups.map((group, index) => ({
    ...group,
    title: translation.experience.skillTitles[index],
  }));

  return mergeCopy(base, {
    ...translation,
    experience: {
      ...translation.experience,
      work,
      skillGroups,
    },
  });
}
