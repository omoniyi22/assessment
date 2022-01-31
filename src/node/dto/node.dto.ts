export class CreateNodeDto {
  value: string;
  hierarchy: number;
  parentId: number;
  ancestorIds: string;
}

export class UpdateNodeDto {
  value: string;
}
