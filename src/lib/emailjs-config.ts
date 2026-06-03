export function getEmailJsConfig() {
  return {
    serviceId: process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID?.trim() ?? "",
    templateId: process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID?.trim() ?? "",
    publicKey: process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY?.trim() ?? "",
  };
}

export function isEmailJsConfigured(): boolean {
  const { serviceId, templateId, publicKey } = getEmailJsConfig();
  return Boolean(serviceId && templateId && publicKey);
}
