import csv from "csv-parser";

interface DataPoint {
  km: number;
  price: number;
}

interface Theta {
  theta0: number;
  theta1: number;
}


function normalizeData(data: DataPoint[]): { normalizedData: DataPoint[], kmMean: number, kmStdev: number, priceMean: number, priceStdev: number } {
  const kmValues = data.map(d => d.km);
  const priceValues = data.map(d => d.price);
  
  const kmMean = kmValues.reduce((a, b) => a + b, 0) / kmValues.length;
  const priceMean = priceValues.reduce((a, b) => a + b, 0) / priceValues.length;
  
  const kmStdev = Math.sqrt(kmValues.reduce((sum, val) => sum + Math.pow(val - kmMean, 2), 0) / kmValues.length);
  const priceStdev = Math.sqrt(priceValues.reduce((sum, val) => sum + Math.pow(val - priceMean, 2), 0) / priceValues.length);
  
  const normalizedData = data.map(point => ({
    km: (point.km - kmMean) / kmStdev,
    price: (point.price - priceMean) / priceStdev
  }));
  
  return { normalizedData, kmMean, kmStdev, priceMean, priceStdev };
}

function calculateCost(
  data: DataPoint[],
  theta0: number,
  theta1: number
): number {
  const m = data.length;
  let totalCost = 0;

  for (const point of data) {
    const estimatedPrice = theta0 + theta1 * point.km;
    const cost = estimatedPrice - point.price;
    totalCost += cost * cost;
  }

  return totalCost / (2 * m);
}

function trainModel(
  data: DataPoint[],
  learningRate: number,
  iterations: number,
  initialTheta: Theta,
): Theta {
  const m = data.length;
  let theta0 = initialTheta.theta0;
  let theta1 = initialTheta.theta1;

  console.log(`Starting training with ${iterations} iterations...`);

  for (let i = 0; i < iterations; i++) {
    let sumTheta0 = 0;
    let sumTheta1 = 0;

    for (const point of data) {
      const predicted = theta0 + theta1 * point.km;
      const error = predicted - point.price;

      sumTheta0 += error;
      sumTheta1 += error * point.km;
    }

    theta0 -= learningRate * (1 / m) * sumTheta0;
    theta1 -= learningRate * (1 / m) * sumTheta1;

    if (i % (iterations / 10) === 0) {
      const cost = calculateCost(data, theta0, theta1);
      console.log(
        `Iteration ${i}: theta0=${theta0.toFixed(6)}, theta1=${theta1.toFixed(
          6
        )}, cost=${cost.toFixed(6)}`
      );
    }
  }

  return { theta0, theta1 };
}

async function main(args: string[]) {
    // Flags: --resume or -r to continue training from theta.json
    const resume = args.includes("--resume") || args.includes("-r");

    // Default hyper-parameters
    let learningRate = 0.01;
    let iterations = 10000;

    if (args.length <= 2) {
      console.log("Default parameters loaded, try --help for more information");
    }
    // Parse optional CLI parameters
    for (let i = 2; i < args.length; i++) {
      const arg = args[i]!;
      if (arg === "--lr" || arg === "--learning-rate") {
        const valStr = args[i + 1];
        if (valStr !== undefined) {
          const val = parseFloat(valStr);
          if (!isNaN(val)) {
            learningRate = val;
            i++; // skip value
          }
        }
      } else if (arg === "--iter" || arg === "--iterations") {
        const valStr = args[i + 1];
        if (valStr !== undefined) {
          const val = parseInt(valStr);
          if (!isNaN(val)) {
            iterations = val;
            i++;
          }
        }
      } else if (arg === "--help" || arg === "-h") {
        console.log("Usage: bun run train.ts [--lr <learningRate>] [--iter <iterations>]");
        console.log("  --lr, --learning-rate: Learning rate (default: 0.01)");
        console.log("  --iter, --iterations: Number of iterations (default: 10000)");
        process.exit(0);
      }
    }

    console.log(`Parameters: learningRate=${learningRate}, iterations=${iterations}`);
 
    const data_file = Bun.file("data.csv");
    const csvContent = await data_file.text();
  
    const data: DataPoint[] = [];
  
    const parser = csv();
  
    parser.on('data', (row) => {
      data.push({
        km: parseInt(row.km),
        price: parseInt(row.price)
      });
    });

    parser.on('end', async () => {
      console.log(`Data loaded: ${data.length} points`);
      
      const { normalizedData, kmMean, kmStdev, priceMean, priceStdev } = normalizeData(data);
      console.log(`Normalized data - km: μ=${kmMean.toFixed(0)}, σ=${kmStdev.toFixed(0)} | price: μ=${priceMean.toFixed(0)}, σ=${priceStdev.toFixed(0)}`);
      
      // Initial normalized parameters (defaults to zero)
      let initialThetaNorm: Theta = { theta0: 0, theta1: 0 };

      if (resume) {
        const thetaFile = Bun.file("theta.json");
        if (await thetaFile.exists()) {
          const savedText = await thetaFile.text();
          const saved = JSON.parse(savedText);
          if (typeof saved.theta0 === "number" && typeof saved.theta1 === "number") {
            const theta1Norm = saved.theta1 * (kmStdev / priceStdev);
            const theta0Norm = (saved.theta0 - priceMean + saved.theta1 * kmMean) / priceStdev;
            initialThetaNorm = { theta0: theta0Norm, theta1: theta1Norm };
            console.log("Resuming training from previous theta.json");
          }
        }
      }

      const { theta0, theta1 } = trainModel(normalizedData, learningRate, iterations, initialThetaNorm);
      
      const originalTheta1 = theta1 * (priceStdev / kmStdev);
      const originalTheta0 = theta0 * priceStdev + priceMean - originalTheta1 * kmMean;
      
      console.log("\nResults");
      console.log(`theta0 = ${originalTheta0.toFixed(6)}`);
      console.log(`theta1 = ${originalTheta1.toFixed(6)}`);
      Bun.write("theta.json", JSON.stringify({theta0: originalTheta0, theta1: originalTheta1}, null, 2));
      console.log("Parameters saved in theta.json");
      
    });
    
    parser.write(csvContent);
    parser.end();
}

main(process.argv)
