<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Google_Client;
use Google_Service_Drive;

class GoogleDriveTestController extends Controller
{
public function index(): Response
{
$client = new Google_Client();
$client->setClientId(env('GOOGLE_DRIVE_CLIENT_ID'));
$client->setClientSecret(env('GOOGLE_DRIVE_CLIENT_SECRET'));
$client->refreshToken(env('GOOGLE_DRIVE_REFRESH_TOKEN'));

$service = new Google_Service_Drive($client);

try {
$files = $service->files->listFiles([
'q' => "'root' in parents",
'fields' => 'files(id, name)',
]);

$items = [];
foreach ($files->getFiles() as $file) {
$items[] = [
'id' => $file->getId(),
'name' => $file->getName(),
];
}

return response()->json($items);
} catch (\Exception $e) {
return response()->json(['error' => $e->getMessage()], 500);
}
}
}
