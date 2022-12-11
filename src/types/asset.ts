interface metricsType {
  totalCollectsUptime: number,
  totalUptime: number,
  lastUptimeAt: number
}

export type assetType = {
    id: string,
    sensors: string[],
    model: string,
    status: string,
    healthscore: number,
    name: string,
    image: string,
    specifications: any,
    metrics: metricsType,
    unitId: string,
    companyId: string
}