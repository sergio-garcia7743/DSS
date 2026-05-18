export interface ModuleStep {
  id: number;
  text: string;
}

export interface TrainingModule {
  id: number;
  title: string;
  videoUrl: string;
}

export const COMMON_STEPS: ModuleStep[] = [
  { id: 1, text: "Coloque el panel A sobre el panel B, cara con cara." },
  { id: 2, text: "Alinee las orillas y las marcas de referencia." },
  { id: 3, text: "Inicie la costura en el punto marcado." },
  { id: 4, text: "Cosa siguiendo la línea guía del material." },
  { id: 5, text: "Mantenga el margen de costura constante." },
  { id: 6, text: "Deténgase en las esquinas o curvas para ajustar la pieza." },
  { id: 7, text: "Refuerce la costura al inicio y al final." },
  { id: 8, text: "Recorte el hilo sobrante." },
  { id: 9, text: "Voltee la pieza y acomode la costura." },
  { id: 10, text: "Revise que la puntada esté recta y sin defectos." },
];

export const TRAINING_MODULES: TrainingModule[] = [
  { id: 1, title: "Unión de Hombros", videoUrl: "https://www.youtube.com/embed/oar000HnCQQ" },
  { id: 2, title: "Pegado de Cuello", videoUrl: "https://www.youtube.com/embed/oar000HnCQQ" },
  { id: 3, title: "Montado de Mangas", videoUrl: "https://www.youtube.com/embed/oar000HnCQQ" },
  { id: 4, title: "Cierre de Costados", videoUrl: "https://www.youtube.com/embed/oar000HnCQQ" },
  { id: 5, title: "Preparación de Puños", videoUrl: "https://www.youtube.com/embed/oar000HnCQQ" },
  { id: 6, title: "Pegado de Puños", videoUrl: "https://www.youtube.com/embed/oar000HnCQQ" },
  { id: 7, title: "Dobladillo de Ruedo", videoUrl: "https://www.youtube.com/embed/oar000HnCQQ" },
  { id: 8, title: "Pegado de Bolsillos", videoUrl: "https://www.youtube.com/embed/oar000HnCQQ" },
  { id: 9, title: "Ojalado y Botonadura", videoUrl: "https://www.youtube.com/embed/oar000HnCQQ" },
  { id: 10, title: "Inspección y Acabado", videoUrl: "https://www.youtube.com/embed/oar000HnCQQ" },
];
