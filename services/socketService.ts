import * as signalR from '@microsoft/signalr';
import env from '@/constants/envConstant';

class SocketService {
  private connection: signalR.HubConnection;

  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${env.API_URL}/hubs/booking`)
      .withAutomaticReconnect()
      .build();

    // Logging trạng thái
    this.connection.onclose((error) => {
      console.log("🔌 Connection closed", error);
    });

    this.connection.onreconnecting(() => {
      console.log("🔄 Reconnecting...");
    });

    this.connection.onreconnected(() => {
      console.log("✅ Reconnected!");
    });
  }

  public async startConnection() {
    try {
      if (this.connection.state === signalR.HubConnectionState.Disconnected) {
        await this.connection.start();
        console.log("✅ Connected to booking hub");
      } else {
        console.log(`⚠️ Hub is already in state: ${this.connection.state}`);
      }
    } catch (err) {
      console.log("❌ SignalR Connection Error: ", err);

      // Chỉ retry nếu đang ở trạng thái Disconnected
      if (this.connection.state === signalR.HubConnectionState.Disconnected) {
        setTimeout(() => this.startConnection(), 5000);
      }
    }
  }

  public onBookingStatusUpdated(callback: (data: any) => void) {
    this.connection.on("BookingStatusUpdated", callback);
  }

  public stopConnection() {
    this.connection.stop();
  }
}

export const socketService = new SocketService();
