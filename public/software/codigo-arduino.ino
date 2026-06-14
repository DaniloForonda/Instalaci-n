// ==========================================
// CONFIGURACIÓN DE PINES
// ==========================================
const int SRF_TRIG = 9;
const int SRF_ECHO = 10;
const int AD8232_OUT = A0;
const int HW827_OUT  = A1;

// ==========================================
// VARIABLES DE TIEMPO (MULTITAREA)
// ==========================================
unsigned long prevSRF = 0;
unsigned long prevAD  = 0;
unsigned long prevHW  = 0;

const long intSRF = 50;  // Ultrasonido cada 50ms (estable)
const long intAD  = 10;  // ECG necesita más velocidad (100Hz)
const long intHW  = 20;  // Pulso óptico cada 20ms

// ==========================================
// FUNCIONES DE APOYO
// ==========================================

float leerUltrasonido() {
  digitalWrite(SRF_TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(SRF_TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(SRF_TRIG, LOW);
  
  long duration = pulseIn(SRF_ECHO, HIGH, 25000); // Timeout para no bloquear
  return duration * 0.0343 / 2;
}




// Variables de suavizado para SRF05
float distFilt = 0;

void setup() {
  Serial.begin(115200);
  
  // Setup SRF05
  pinMode(SRF_TRIG, OUTPUT);
  pinMode(SRF_ECHO, INPUT);
  
  // Setup AD8232 (ECG)
  pinMode(11, INPUT); // Leads-off detection -
  pinMode(12, INPUT); // Leads-off detection +
}

void loop() {
  unsigned long currentMillis = millis();

  // ------------------------------------------
  // SENSOR 1: SRF05 (Ultrasonido)
  // ------------------------------------------
  if (currentMillis - prevSRF >= intSRF) {
    prevSRF = currentMillis;
    float d = leerUltrasonido();
    if (d > 0) {
      distFilt = (distFilt * 0.7) + (d * 0.3); // Filtro pasabajos simple
    
    if (d > 2 && d < 400) {// Si la lectura falla, mantenemos la anterior en lugar de no enviar nada
      distFilt = (distFilt * 0.7) + (d * 0.3);
    }
      
      // ENVIAR A TOUCHDESIGNER (Canal R)
      Serial.print("dist:");
      Serial.println(distFilt);
    }
  }
  // ------------------------------------------
  // SENSOR 2: AD8232 (ECG / Tensión Muscular)
  // ------------------------------------------
   if (currentMillis - prevAD >= intAD) {
    prevAD = currentMillis;
    
    // Verificación de cables conectados (Pines 11 y 12)
    if ((digitalRead(11) == HIGH) || (digitalRead(12) == HIGH)) {
      // Si hay mala conexión enviamos un valor neutro
      Serial.println("ecg:512"); 
    } else {
      int ecgVal = analogRead(AD8232_OUT);
      Serial.print("ecg:");
      Serial.println(ecgVal);
    }
  }

  // ------------------------------------------
  // SENSOR 3: HW-827 (Pulse Sensor)
  // ------------------------------------------
if (currentMillis - prevHW >= intHW) {
    prevHW = currentMillis;
    int pulseVal = analogRead(HW827_OUT);
    Serial.print("pulse:");
    Serial.println(pulseVal);
  }
}

