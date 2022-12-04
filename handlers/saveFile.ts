import { randomUUID } from 'crypto';
import { File } from 'formidable';
import fs from 'fs'
import { dirname } from 'path';


const saveFile = (file: File, type: string) => {
  const data = fs.readFileSync(file.filepath);
  const ext = file.originalFilename?.split(".")[1];
  const uuid = randomUUID();
  const path = `./public/imgs/${type}/${uuid}.${ext}`;

  if (!fs.existsSync(dirname(path))) {
    fs.mkdirSync(dirname(path), { recursive: true });
  }

  fs.writeFileSync(path, data);
  return path.slice(8);
};

export default saveFile