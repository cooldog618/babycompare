export const mapUpdatePayload = (body: Record<string, unknown>) => {
  const data: Record<string, unknown> = {};
  const fields = ['title','brand','maker','category1','category2','category3','category4','categoryPath','price','imageUrl','productUrl','seller','rating','reviewCount','description','isVisible'];
  for (const key of fields) if (key in body) data[key] = body[key];
  if (typeof data.imageUrl === 'string' && data.imageUrl.trim() === '') data.imageUrl = null;
  return data;
};
